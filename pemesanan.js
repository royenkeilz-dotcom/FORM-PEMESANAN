// ===== TAB NAVIGATION =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const tabNum = this.dataset.tab;
        
        // Hapus active dari semua tab dan buttons
        document.querySelectorAll('.form-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        // Tambah active ke tab dan button yang dipilih
        document.querySelector(`.form-tab[data-tab="${tabNum}"]`).classList.add('active');
        this.classList.add('active');
    });
});

// ===== QUANTITY BUTTONS =====
document.querySelector('.qty-btn.minus').addEventListener('click', function(e) {
    e.preventDefault();
    const input = document.getElementById('jumlah');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        animateQuantity();
    }
});

document.querySelector('.qty-btn.plus').addEventListener('click', function(e) {
    e.preventDefault();
    const input = document.getElementById('jumlah');
    if (parseInt(input.value) < 100) {
        input.value = parseInt(input.value) + 1;
        animateQuantity();
    }
});

function animateQuantity() {
    const input = document.getElementById('jumlah');
    input.style.transform = 'scale(1.2)';
    setTimeout(() => {
        input.style.transform = 'scale(1)';
    }, 200);
}

// ===== FILE UPLOAD PREVIEW =====
document.getElementById('foto').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('fotoPreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
});

// ===== FORM SUBMISSION =====
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validasi form
    if (!validateForm()) {
        return;
    }
    
    // Ambil data dari form
    const formData = new FormData(this);
    const data = {
        tanggal: getTanggalIndonesia(),
        jam: getJamSekarang(),
        nama: formData.get('nama'),
        telepon: formData.get('telepon'),
        email: formData.get('email'),
        produk: Array.from(document.querySelectorAll('input[name="produk"]:checked'))
                    .map(cb => cb.value)
                    .join(', '),
        jumlah: formData.get('jumlah'),
        lokasi: formData.get('lokasi'),
        keterangan: formData.get('keterangan')
    };
    
    // Tampilkan loading
    showLoading(true);
    
    try {
        // Kirim ke Python backend
        const response = await fetch('http://localhost:5000/simpan_pesanan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showSuccessMessage();
            document.getElementById('orderForm').reset();
            document.getElementById('fotoPreview').innerHTML = '';
            
            // Scroll ke atas untuk melihat pesan sukses
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            throw new Error('Gagal mengirim data');
        }
    } catch (error) {
        console.error('Error:', error);
        showErrorMessage('Pastikan server berjalan di localhost:5000');
    } finally {
        showLoading(false);
    }
});

// ===== VALIDASI FORM =====
function validateForm() {
    const nama = document.getElementById('nama').value.trim();
    const telepon = document.getElementById('telepon').value.trim();
    const lokasi = document.getElementById('lokasi').value.trim();
    const produkCheckboxes = document.querySelectorAll('input[name="produk"]:checked');
    
    // Clear sebelumnya
    document.getElementById('namaError').textContent = '';
    document.getElementById('teleponError').textContent = '';
    document.getElementById('lokasiError').textContent = '';
    document.getElementById('produkError').textContent = '';
    
    let isValid = true;
    
    // Validasi nama
    if (!nama) {
        document.getElementById('namaError').textContent = 'Nama tidak boleh kosong';
        isValid = false;
    } else if (nama.length < 3) {
        document.getElementById('namaError').textContent = 'Nama minimal 3 karakter';
        isValid = false;
    }
    
    // Validasi telepon
    if (!telepon) {
        document.getElementById('teleponError').textContent = 'Telepon tidak boleh kosong';
        isValid = false;
    } else if (!/^(\+62|0)\d{9,12}$/.test(telepon)) {
        document.getElementById('teleponError').textContent = 'Format nomor telepon tidak valid';
        isValid = false;
    }
    
    // Validasi lokasi
    if (!lokasi) {
        document.getElementById('lokasiError').textContent = 'Lokasi pengantaran tidak boleh kosong';
        isValid = false;
    } else if (lokasi.length < 10) {
        document.getElementById('lokasiError').textContent = 'Lokasi harus lebih detail';
        isValid = false;
    }
    
    // Validasi produk
    if (produkCheckboxes.length === 0) {
        document.getElementById('produkError').textContent = 'Pilih minimal satu produk';
        isValid = false;
    }
    
    return isValid;
}

// ===== UTILITY FUNCTIONS =====
function getTanggalIndonesia() {
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    };
    return new Date().toLocaleDateString('id-ID', options);
}

function getJamSekarang() {
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
    };
    return new Date().toLocaleTimeString('id-ID', options);
}

function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (show) {
        spinner.style.display = 'flex';
        spinner.style.animation = 'slideInNotif 0.4s ease-out';
    } else {
        spinner.style.display = 'none';
    }
}

function showSuccessMessage() {
    const msg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    errorMsg.style.display = 'none';
    msg.style.display = 'block';
    msg.style.animation = 'slideInNotif 0.4s ease-out';
    
    // Auto hide setelah 5 detik
    setTimeout(() => {
        msg.style.display = 'none';
    }, 5000);
}

function showErrorMessage(customMsg = null) {
    const msg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');
    
    successMsg.style.display = 'none';
    msg.style.display = 'block';
    msg.style.animation = 'slideInNotif 0.4s ease-out';
    
    if (customMsg) {
        document.getElementById('errorText').textContent = customMsg;
    }
    
    setTimeout(() => {
        msg.style.display = 'none';
    }, 5000);
}

// ===== SMOOTH INPUT EFFECTS =====
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// ===== PRODUCT SELECTION ANIMATION =====
document.querySelectorAll('.product-card input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const card = this.closest('.product-card');
        if (this.checked) {
            card.style.animation = 'slideUp 0.3s ease-out';
        }
    });
});

// ===== RESET FORM ANIMATION =====
document.querySelector('.btn-reset').addEventListener('click', function(e) {
    setTimeout(() => {
        document.getElementById('fotoPreview').innerHTML = '';
    }, 100);
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.animation = 'none';
});
