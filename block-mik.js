(function (blocks, components, i18n, editor, element) {
  const el = element.createElement;
  const TextControl = wp.components.TextControl;

  blocks.registerBlockType(

    // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    'mka/fancy-image-link', {

    // The title of our block.
    title: i18n.__('Fancy image link'),

    // Dashicon icon for our block.
    icon: 'megaphone',

    // The category of the block.
    category: 'common',

    // Necessary for saving block content.
    attributes: {
      testimonial: {
        type: 'array',
        source: 'children',
        selector: 'div.mka-find-more-text',
        default: 'Find more'
      },
      mediaID: {
        type: 'number'
      },
      mediaURL: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src'
      },
      url: {
        type: 'string',
        source: 'attribute',   
        selector: 'a',
        attribute: 'href'      
      }
    },

    edit: function (props) {

      var focus = props.focus;
      var focusedEditable = props.focus ? props.focus.editable || 'name' : null;      
      var attributes = props.attributes;
      var contactURL = props.attributes.contactURL;

      var onSelectImage = function (media) {
        return props.setAttributes({
          mediaURL: media.url,
          mediaID: media.id,
        });
      };

      const urlText = el( TextControl, {
        label: 'Link url',
        value: props.attributes.url,
        key: 'url',
        onChange: function( value ) {
          props.setAttributes( { url: value } );
        }
      } );
      
      return [   
        urlText,     
        el('div', { className: props.className },
          el('div', { className: attributes.mediaID ? 'image-active' : 'image-inactive' },
            el(wp.blockEditor.MediaUpload, {
              onSelect: onSelectImage,
              type: 'image',
              value: attributes.mediaID,
              render: function (obj) {
                return el(components.Button, {
                  className: attributes.mediaID ? 'image-button' : 'button button-large',
                  onClick: obj.open
                },
                  !attributes.mediaID ? i18n.__('Upload Image') : el('img', { src: attributes.mediaURL })
                );
              }
            })
          ),
          el('div', { className: '' },
            el(wp.blockEditor.RichText, {
              tagName: 'div',
              inline: true,
              placeholder: i18n.__('Insert link text...'),
              value: attributes.testimonial,
              onChange: function (newTestimonial) {
                props.setAttributes({ testimonial: newTestimonial });
              },
              focus: focusedEditable === 'testimonial' ? focus : null,
              onFocus: function (focus) {
                props.setFocus(_.extend({}, focus, { editable: 'testimonial' }));
              },
            }),            
          ),
        )
       ];
    },

    save: function (props) {
      var attributes = props.attributes;      
      return (
        el('div', { className: ['mkablock2', props.className].join(' ') },          
          el('a', { href: attributes.url, className: '' },
            el('img', { src: attributes.mediaURL }),
            el('div', { className: 'mka-find-more'},
              el('div', { className: 'mka-find-more-text' }, attributes.testimonial)           
            )
          ),          
        )
      );
    }
  });

})(
  window.wp.blocks,
  window.wp.components,
  window.wp.i18n,
  window.wp.editor,
  window.wp.element,
);