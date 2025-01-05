document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.querySelector('.navbar-toggler');

    toggleButton.addEventListener('click', function () {
        sidebar.classList.toggle('show');
    });

    // Close sidebar on clicking outside (for mobile)
    document.addEventListener('click', function (e) {
        if (!sidebar.contains(e.target) && !toggleButton.contains(e.target) && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });
});
