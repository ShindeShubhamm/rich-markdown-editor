import { wrappingInputRule } from 'prosemirror-inputrules'
import Node from '../../src/nodes/Node'
import toggleWrap from '../../src/commands/toggleWrap'

export default class CustomBlockquote extends Node {
  get name() {
    return 'blockquote_custom'
  }

  get schema() {
    return {
      content: 'block+',
      group: 'block',
      parseDOM: [{ tag: 'blockquote' }],
      toDOM: () => ['blockquote', 0],
    }
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^\s*>\s$/, type)]
  }

  commands({ type }) {
    return () => toggleWrap(type)
  }

  keys({ type }) {
    return {
      'Mod-[': toggleWrap(type),
    }
  }

  toMarkdown(state, node) {
    state.wrapBlock('> ', null, node, () => state.renderContent(node))
  }

  parseMarkdown() {
    return { block: 'blockquote' }
  }
}
