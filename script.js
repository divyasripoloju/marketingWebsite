document.addEventListener("DOMContentLoaded", function() {
    const productContainer = document.getElementById("product-container");
    const tabsContainer = document.querySelector('.tabs');
    
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;
            console.log("Fetched Categories:", categories); // Debugging line
            
            // Create tabs dynamically
            categories.forEach(category => {
                const tabButton = document.createElement("button");
                tabButton.classList.add("tab-button");
                tabButton.textContent = category.category_name;
                tabButton.setAttribute("data-category", category.category_name);
                tabsContainer.appendChild(tabButton);
                
            });

            // Fetch and display products based on selected tab
            function displayProducts(categoryName) {
                productContainer.innerHTML = ''; // Clear existing products

                categories.forEach(category => {
                    if (category.category_name === categoryName) {
                        category.category_products.forEach(product => {
                            const productElement = document.createElement("div");
                            productElement.classList.add("product");

                            const productImage = document.createElement("img");
                            productImage.src = product.image;
                            productImage.alt = product.title;

                            if (product.badge_text) { // Check if badge_text is not null
                                const productBadge = document.createElement("div");
                                productBadge.classList.add("badge");
                                productBadge.textContent = product.badge_text;
                                productElement.appendChild(productBadge);
                            }

                            const productTitle = document.createElement("h2");
                            productTitle.textContent = product.title ;

                            const productVendor = document.createElement("p");
                            productVendor.innerHTML = `&bull; ${product.vendor}`;

                            const productPrice = document.createElement("div");
                            productPrice.classList.add("price");
                            productPrice.textContent = `Rs ${product.price}`;

                            const productCompareAtPrice = document.createElement("span");
                            productCompareAtPrice.classList.add("compare-at-price");
                            productCompareAtPrice.textContent = `Rs ${product.compare_at_price}`;

                            const discount = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
                            const productDiscount = document.createElement("span");
                            productDiscount.classList.add("discount");
                            productDiscount.textContent = `${discount}% Off`;

                            const addToCartButton = document.createElement("button");
                            addToCartButton.textContent = "Add to Cart";

                            productElement.appendChild(productImage);
                            productElement.appendChild(productTitle);
                            productElement.appendChild(productVendor);
                            productElement.appendChild(productPrice);
                            productPrice.appendChild(productCompareAtPrice);
                            productPrice.appendChild(productDiscount);
                            productElement.appendChild(addToCartButton);

                            productContainer.appendChild(productElement);
                        });
                    }
                });
            }

            const tabs = document.querySelectorAll('.tab-button');
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');

                    const category = this.getAttribute('data-category');
                    displayProducts(category);
                });
            });

            // Trigger click on the first tab to show initial products
            tabs[0].click();
        })
        .catch(error => console.error('Error fetching product data:', error));
});
