document.addEventListener("DOMContentLoaded", function () {
    // 取得目前頁面檔名
    const currentPage = window.location.pathname.split("/").pop();

    // 遍歷所有導覽列連結，標記 active 頁面
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});
