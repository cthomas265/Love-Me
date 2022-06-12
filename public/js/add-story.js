async function newFormHandler(event) {
    event.preventDefault();
  
    const newStoryForm = document.querySelector('.new-story-form');
    const content = document.querySelector('input[name="story-content"]').value;
    const photo = document.querySelector('input[name="story-photo"]').value;
  
    const response = await fetch(`/api/story`, {
      method: 'POST',
      body: JSON.stringify({
        content,
        photo
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      newStoryForm.reset();
      document.location.replace('/success');
    } else {
      alert(response.statusText);
    }
}

document.querySelector('.new-story-form').addEventListener('submit', newFormHandler);