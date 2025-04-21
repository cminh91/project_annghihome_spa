import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const DescriptionEditor = ({ value, onChange }) => {
  const [description, setDescription] = useState(value);
  
  useEffect(() => {
    setDescription(value);
  }, [value]);

  const handleEditorChange = (content) => {
    setDescription(content);
    onChange(content);
  };
  return (
    <div>
      <h3>Mô tả</h3>
      <Editor
        apiKey="l1iwsjkxm1pu64770dvpd8mlc1nryrqv06spylo8baevggrf"  // Optional: Add your API key if necessary
        value={description}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf', 'textcolor', 'fullscreen', 'directionality', 'insertdatetime', 'paste', 'nonbreaking', 'save', 'visualchars', 'wordcount'
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | forecolor backcolor | fullscreen | insertdatetime nonbreaking | save | preview',  // Toolbar includes color options, full screen, save, etc.
          content_css: '//www.tiny.cloud/css/codepen.min.css',  // Optional: Add custom CSS for styling
          file_picker_callback: function(callback, value, meta) {
            // Handle image selection
            if (meta.filetype == 'image') {
              var input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.accept = 'image/*';
              input.click();
              input.onchange = function() {
                var file = input.files[0];
                var reader = new FileReader();
                reader.onload = function() {
                  callback(reader.result, { alt: file.name });
                };
                reader.readAsDataURL(file);
              };
            }
          },
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default DescriptionEditor;
