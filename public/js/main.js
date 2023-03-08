const subscriptionsContainer = document.querySelector('#subscriptions-container');

// Get all subscriptions from the server and display them on the page
fetch('/api/subscriptions')
  .then(response => response.json())
  .then(subscriptions => {
    subscriptions.forEach(subscription => {
      const subscriptionElement = createSubscriptionElement(subscription);
      subscriptionsContainer.appendChild(subscriptionElement);
    });
  });

// Handle form submission to add a new subscription
const newSubscriptionForm = document.querySelector('#new-subscription-form');
newSubscriptionForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(newSubscriptionForm);
  const subscriptionData = {
    name: formData.get('name'),
    type: formData.get('type'),
    price: parseFloat(formData.get('price')),
  };
  fetch('/api/subscriptions', {
    method: 'POST',
    body: JSON.stringify(subscriptionData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(subscription => {
    const subscriptionElement = createSubscriptionElement(subscription);
    subscriptionsContainer.appendChild(subscriptionElement);
    newSubscriptionForm.reset();
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// Handle edit button clicks
subscriptionsContainer.addEventListener('click', event => {
  if (event.target.classList.contains('edit')) {
    const subscriptionId = event.target.dataset.id;
    const subscriptionElement = event.target.closest('.subscription');
    const subscriptionName = subscriptionElement.querySelector('h2').textContent;
    const subscriptionType = subscriptionElement.querySelector('p:nth-of-type(1)').textContent.replace('Type: ', '');
    const subscriptionPrice = subscriptionElement.querySelector('p:nth-of-type(2)').textContent.replace('Price: $', '');
    const editSubscriptionForm = createEditSubscriptionForm(subscriptionId, subscriptionName, subscriptionType, subscriptionPrice);
    subscriptionElement.appendChild(editSubscriptionForm);
  }
});

// Handle form submission to update a subscription
subscriptionsContainer.addEventListener('submit', event => {
  event.preventDefault();
  if (event.target.classList.contains('edit-subscription-form')) {
    const formData = new FormData(event.target);
    const subscriptionId = formData.get('id');
    const subscriptionData = {
      name: formData.get('name'),
      type: formData.get('type'),
      price: parseFloat(formData.get('price')),
    };
    fetch(`/api/subscriptions/${subscriptionId}`, {
      method: 'PUT',
      body: JSON.stringify(subscriptionData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(updatedSubscription => {
      const subscriptionElement = event.target.closest('.subscription');
      subscriptionElement.replaceWith(createSubscriptionElement(updatedSubscription));
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});

// Handle delete button clicks
subscriptionsContainer.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    const subscriptionId = event.target.dataset.id;
    fetch(`/api/subscriptions/${subscriptionId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Subscription deleted successfully');
        const subscriptionElement = event.target.closest('.subscription');
        subscriptionElement.remove();
      } else {
        console.log('Subscription could not be deleted');
      }
    })
    .catch(error => {
      console.error('Error deleting subscription:', error);
    });
  }
});

// Helper function to create a subscription element from subscription data
function createSubscriptionElement(subscription) {
    const subscriptionElement = document.createElement('div');
    subscriptionElement.classList.add('subscription');
    subscriptionElement.innerHTML = `
      <h2>${subscription.name}</h2>
      <p>Type: ${subscription.type}</p>
      <p>Price: $${subscription.price.toFixed(2)}</p>
      <button class="edit" data-id="${subscription.id}">Edit</button>
      <button class="delete" data-id="${subscription.id}">Delete</button>
    `;
    return subscriptionElement;
  }