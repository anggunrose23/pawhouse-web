import { supabase } from "./supabase.js";


document.querySelector(".adopt-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Ambil semua data form
    const data = {
        fullName: document.getElementById("name").value,
        emailAddress: document.getElementById("email").value,
        phoneNumber: document.getElementById("phone").value,
        residenceType: document.getElementById("residence").value,
        landlordContact: document.getElementById("landlord").value,
        petInterest: document.getElementById("petInterest").value,
        petExperience: document.getElementById("experience").value,
        agreement: document.getElementById("agreement").checked
    };

    // Pastikan Anda juga memiliki 'event' yang didefinisikan 
    // di form submission, atau ganti event.target.reset() menjadi e.target.reset()
    const { error } = await supabase.from("adoption").insert([data]);

    if (error) {
        showNotification("❌ Gagal menyimpan ke database Supabase!");
        console.error(error);
        return;
    }

    showNotification("✔ Berhasil tersimpan ke Supabase!");
    e.target.reset(); // Menggunakan e.target untuk mereset form
});


// Fungsi menampilkan notifikasi
function showNotification(message) {
    const box = document.createElement("div");
    box.className = "notif-box";
    box.textContent = message;

    document.body.appendChild(box);

    setTimeout(() => {
        box.classList.add("show");
    }, 10);

    // Hilang setelah 3 detik
    setTimeout(() => {
        box.classList.remove("show");
        setTimeout(() => box.remove(), 300);
    }, 3000);
}
