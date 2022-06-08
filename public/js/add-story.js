async function newFormHandler(event) {
    event.preventDefault();
  
    const content = document.querySelector('input[name="content"]').value;
    const photo = document.querySelector('input[name="photo"]').value;
    const animal_id = document.querySelector('input[name="???"]').value;
  
    const response = await fetch(`/api/story`, {
      method: 'POST',
      body: JSON.stringify({
        content,
        photo,
        animal_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/success');
    } else {
      alert(response.statusText);
    }
}

document.querySelector('.new-story-form').addEventListener('submit', newFormHandler);