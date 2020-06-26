# rich-markdown-editor

In addition to [rich-markdown-editor](https://www.npmjs.com/package/rich-markdown-editor#props):

## Additional Props

### extends

To add custom components, you need to send two props `customComponents` and `menuUi`, both array. CustomComponents being array of instances of custom component and menuUi being array of ui to be rendered in block menu. e.g.,

```javascript
<Editor
  customComponents={[new CustomBlockquote()]}
  menuUi={[
    {
      name: 'blockquote_custom',
      title: 'Custom Blockquote',
      icon: DocumentIcon,
      shortcut: `${mod} [`,
      keywords: 'custom blockquote',
    },
  ]}
/>
```

Detailed example of **Custom Blockquote** in examples directory.
