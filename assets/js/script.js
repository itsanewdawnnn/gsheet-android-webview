document.addEventListener('DOMContentLoaded', () => {
    
    // --- KONFIGURASI ---
    const CONFIG = {
        allowedOrigin: 'https://itsanewdawnnn.github.io',
        sheetID: '1JZ4OV-qpB_QhyXJMeNR9YRAL5GDuKYdAm62ch7ShteM',
        gid: '371636866'
    };

    // --- FUNGSI SECURITY CHECK ---
    function checkSecurity() {
        // Jika environment adalah local file (testing) atau domain tidak cocok
        // Note: Untuk testing lokal, Anda bisa menambahkan 'null' atau 'file://' sementara waktu jika perlu.
        if (window.location.origin !== CONFIG.allowedOrigin) {
            
            // Sembunyikan loader
            hideLoader(); 
            
            // Tampilkan SweetAlert Error
            Swal.fire({
                icon: 'error',
                title: 'Akses Ditolak',
                text: 'Halaman ini hanya dapat diakses melalui domain resmi.',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#e74c3c',
                confirmButtonText: 'Tutup',
                background: 'rgba(255, 255, 255, 0.9)',
                backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                `
            }).then(() => {
                // Setelah tombol ditekan, hapus seluruh body atau redirect
                document.body.innerHTML = '';
                window.location.href = 'about:blank'; // Atau redirect ke Google
            });

            return false; // Gagal
        }
        return true; // Lolos
    }

    // --- FUNGSI UTAMA ---
    function init() {
        if (!checkSecurity()) return;

        // Jika lolos security check, load data
        loadSheetData();
    }

    // --- HELPER FUNCTIONS ---
    function showLoader() {
        document.getElementById('loader').classList.remove('hidden');
    }

    function hideLoader() {
        document.getElementById('loader').classList.add('hidden');
    }

    function showContent() {
        // Efek fade-in saat konten muncul
        const content = document.getElementById('main-content');
        content.style.opacity = 0;
        content.style.display = 'block';
        content.style.transition = 'opacity 0.8s ease';
        
        // Sedikit delay agar transisi jalan
        setTimeout(() => {
            content.style.opacity = 1;
        }, 50);
    }

    // --- DATA LOADING & PARSING ---
    function loadSheetData() {
        showLoader();
        const url = `https://docs.google.com/spreadsheets/d/${CONFIG.sheetID}/export?format=csv&gid=${CONFIG.gid}`;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(csvText => {
                Papa.parse(csvText, {
                    complete: function(results) {
                        processData(results.data);
                        hideLoader();
                        showContent(); // Tampilkan konten hanya jika sukses ambil data
                    },
                    error: function(err) {
                        throw err;
                    }
                });
            })
            .catch(err => {
                hideLoader();
                console.error("Detail error:", err);
                Swal.fire({
                    icon: 'warning',
                    title: 'Gagal Memuat Data',
                    text: 'Terjadi kesalahan saat mengambil data dari Google Sheets.',
                    confirmButtonColor: '#0984e3'
                });
            });
    }

    function processData(data) {
        if (!data || data.length === 0) return;

        const portfolioThead = document.querySelector('#tabel-portfolio thead');
        const portfolioTbody = document.querySelector('#tabel-portfolio tbody');
        const rekapitulasiThead = document.querySelector('#tabel-rekapitulasi thead');
        const rekapitulasiTbody = document.querySelector('#tabel-rekapitulasi tbody');

        // Bersihkan tabel
        portfolioThead.innerHTML = '';
        portfolioTbody.innerHTML = '';
        rekapitulasiThead.innerHTML = '';
        rekapitulasiTbody.innerHTML = '';

        // --- Render Header Portfolio (Kolom 0-7) ---
        const headRow = document.createElement('tr');
        for (let j = 0; j <= 7; j++) {
            const th = document.createElement('th');
            th.textContent = data[0][j] ?? '';
            headRow.appendChild(th);
        }
        portfolioThead.appendChild(headRow);

        // --- Render Body Portfolio ---
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            // Cek jika baris kosong
            const isEmpty = row.slice(0, 8).every(cell => !cell || cell.trim() === '');
            if (isEmpty) continue;

            const tr = document.createElement('tr');
            for (let j = 0; j <= 7; j++) {
                const td = document.createElement('td');
                td.textContent = row[j] ?? '';
                tr.appendChild(td);
            }
            portfolioTbody.appendChild(tr);
        }

        // --- Render Header Rekapitulasi (Kolom 9-10) ---
        const rekapHeader = document.createElement('tr');
        for (let j = 9; j <= 10; j++) {
            const th = document.createElement('th');
            th.textContent = data[0][j] ?? '';
            rekapHeader.appendChild(th);
        }
        rekapitulasiThead.appendChild(rekapHeader);

        // --- Render Body Rekapitulasi (Baris 1-8) ---
        for (let i = 1; i <= 8; i++) {
            if (!data[i]) continue;
            const tr = document.createElement('tr');
            for (let j = 9; j <= 10; j++) {
                const td = document.createElement('td');
                td.textContent = data[i][j] ?? '';
                tr.appendChild(td);
            }
            rekapitulasiTbody.appendChild(tr);
        }
    }

    // Jalankan inisialisasi
    init();
});
