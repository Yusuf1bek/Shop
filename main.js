const api = 'https://dummyjson.com/products';

async function productsFetch() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderProducts(data.products);
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error occurred while loading products.');
    }
}

function renderProducts(products) {
    const elProducList = document.querySelector('.users-list');
    elProducList.innerHTML = '';  
    products.forEach(product => {
        const elProductItem = `
        <li class="w-[400px] p-5 rounded-lg bg-gray-500 text-white font-bold">
        <h2 class="text-center font-bold text-[20px] mb-2">${product.title}</h2>
            <img src="${product.images[0]}" alt="${product.title}" class="object-contain h-[200px] w-full">
            <p class="text-gray-300 mb-4">${product.description.substring(0, 100)}...</p>
            <div class="flex items-center justify-between">
            <p class="text-[20px] mb-4 text-green-500">$${product.price}</p>
            <button onclick="handleBtnOrder(${product.id}, '${product.images[0]}')" class=" cursor-pointer font-semibold overflow-hidden relative border border-white group px-8 py-2">
                <span class="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">Order</span>
                <span class="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                <span class="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
            </div>
        </li>
        `;
        elProducList.insertAdjacentHTML('beforeend', elProductItem);
    });
}

async function handleBtnOrder(productId, productImage) {
    try {
        const productResponse = await fetch(`${api}/${productId}`);
        if (!productResponse.ok) {
            throw new Error('Product fetch response was not ok');
        }
        const product = await productResponse.json();

        const TOKEN = '7187748804:AAFDzpidZaUgyT1gr5VO0SX1DO-GPHjvaJ0'; 
        const CHAT_ID = '-1002240639960';  
        const HTTP = `https://api.telegram.org/bot${TOKEN}/sendPhoto`;

        const message = `Product: ${product.title}\nPrice: $${product.price}\nDescription: ${product.description}`;

        const photoResponse = await fetch(HTTP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                photo: productImage,
                caption: message,
                parse_mode: "html"
            }),
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Visit telegram chanel');
    }
}
productsFetch();