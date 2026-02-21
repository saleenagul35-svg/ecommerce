document.addEventListener("DOMContentLoaded", () => {
    let products = document.querySelectorAll(".product-item");
    let searchInput = document.getElementById("searchInput");
    let perPageSelect = document.getElementById("perPage");
    let pagination = document.getElementById("pagination");
    let container = document.getElementById("products");
    let containers = document.querySelectorAll(".product1");

    let currentPage = 1;
    let perPage = 8;
    let filtered = Array.from(products);

    function showProducts() {
        let start = (currentPage - 1) * perPage;
        let end = start + perPage;

        products.forEach(p => p.style.display = "none");
        filtered.slice(start, end).forEach(p => p.style.display = "");

        pagination.innerHTML = "";
        let pages = Math.ceil(filtered.length / perPage);

        for (let i = 1; i <= pages; i++) {
            let btn = document.createElement("button");
            btn.textContent = i;
            if (i === currentPage) btn.classList.add("active");
            btn.onclick = function () {
                currentPage = i;
                showProducts();
            };
            pagination.appendChild(btn);
        }
    }

    searchInput.oninput = function () {
        let value = this.value.toLowerCase();
        filtered = Array.from(products).filter(p =>
            p.dataset.title.toLowerCase().includes(value) ||
            p.dataset.description.toLowerCase().includes(value) ||
            p.dataset.location.toLowerCase().includes(value)
        );
        if (filtered.length === 0) {
            filtered = Array.from(products);
        }
        currentPage = 1;
        showProducts();

    };

    perPageSelect.onchange = function () {
        perPage = Number(this.value);
        currentPage = 1;
        showProducts();
    };

    document.getElementById("gridBtn").onclick = () => {
        document.getElementById("gridBtn").classList.add("active")
        document.getElementById("listBtn").classList.remove("active");
        
        container.classList.remove("product-list-view");
         Array.from(containers).forEach(item => {
        item.classList.remove("list-view");
        item.classList.add("grid-view");
    });
    }
    document.getElementById("listBtn").onclick = () => {
        document.getElementById("listBtn").classList.add("active");
        document.getElementById("gridBtn").classList.remove("active")
        container.classList.add("product-list-view");
        Array.from(containers).forEach(item => {
        item.classList.add("list-view");
           item.classList.remove("grid-view");
        
    });

   
    }

    document.querySelectorAll(".viewBtn").forEach(btn => {
        btn.onclick = function () {
            let item = this.closest(".product-item");
            document.querySelector(".modal-title").textContent = item.dataset.title;
            document.getElementById("modalDesc").textContent = item.dataset.description;
            document.getElementById("modalLoc").textContent = "Location: " + item.dataset.location;
            document.getElementById("modalPrice").textContent = "Price: " + item.dataset.price;
            new bootstrap.Modal(document.getElementById("exampleModal")).show();
        };
    });

    showProducts();
});