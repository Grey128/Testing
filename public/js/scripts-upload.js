const uploadForm = document.getElementById('upload-form');
const preview = document.getElementById('preview');
const fileInput = document.getElementById('file-input');
const imageName = document.getElementById('image-name');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!fileInput.files[0]) {
    alert('Please select a file to upload');
    return;
  }

  if (!imageName.value) {
    alert('Please enter a name for the image');
    return;
  }

  const formData = new FormData();
  formData.append('image', fileInput.files[0]);
  formData.append('name', imageName.value);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Image uploaded successfully');
      uploadForm.reset();
      preview.src = '';
    } else {
      alert('Failed to upload image');
    }
  } catch (err) {
    console.error(err);
    alert('Failed to upload image');
  }
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
});
