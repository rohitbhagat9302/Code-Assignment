console.log('====================================');
console.log("Connected");
console.log('====================================');

document.addEventListener("DOMContentLoaded", function () {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').innerText = data.product.title;
            document.getElementById('discountedPrice').innerText = data.product.price;
            document.getElementById('originalPrice').innerText = data.product.compare_at_price;
            // To remove p tag from description
            const productDescription = data.product.description.replace(/<\/?p[^>]*>/g, '');
            document.getElementById('description').innerText = productDescription;
        }
        )
        .catch(error => console.error('Error fetching products:', error));
});



// Display subimages by clicking on them
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainImage');
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
        mainImage.src = this.src;
    });
});



// Add to cart pop-up message
const productDiv = document.querySelector('.cartPopUp');

let selectedColorBox = null;
let selectedRadio = null
function selectColorBox(box, color) {
    if (selectedColorBox) {
        selectedColorBox.classList.remove('selected');
    }

    box.classList.add('selected');
    selectedColorBox = box;
    selectedColorBox.dataset.color = color;
}

function updateSelectedValue() {
    const form = document.getElementById('myForm');
    selectedRadio = Array.from(form.elements['size']).find(radio => radio.checked);
}

function getSelectedColorAndSize() {
    if (selectedColorBox && selectedRadio) {
        const selectedColor = selectedColorBox.dataset.color;
        const selectedValue = selectedRadio.value;
        productDiv.innerText = `Embrace Sideboard with Color ${selectedColor} and Size ${selectedValue} added to cart.`;
        productDiv.style.display = 'block';
    } else {
        alert('No color selected.');
    }
}