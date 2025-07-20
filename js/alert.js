// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector(".ticket-form");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     console.log("📨 Form submission started");

//     const formData = new FormData(form);

//     console.log("🧾 Raw form data:");
//     for (let [key, value] of formData.entries()) {
//       console.log(` - ${key}:`, value);
//     }

//     const payload = {
//       fullName: formData.get("fullName"),
//       gender: formData.get("gender"),
//       email: formData.get("email"),
//       phone: formData.get("phone"),
//       address: formData.get("address"),
//       ticketType: formData.get("ticketType"),
//       spouseName: formData.get("spouseName") || "",
//       childrenDetails: formData.get("childrenDetails") || "",
//       garbaTraining: formData.get("garbaTraining"),
//       earlyBird: formData.get("earlyBird")
//     };

//     console.log("📦 Payload to be sent:", payload);

//     try {
//       const response = await fetch("https://script.google.com/macros/s/AKfycbyvMGv6RvmaPpz0G3wGanqUlVM5VZk2YZee6as2fNxU8n9CQuyq3prR1iRUdWcbizwo-Q/exec", {
//         method: "POST",
//         //mode: "no-cors", // 🚨 Needed for local testing
//         body: JSON.stringify(payload),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const contentType = response.headers.get("Content-Type");
//       if (!contentType || !contentType.includes("application/json")) {
//         const text = await response.text();
//         console.error("❌ Invalid response (not JSON):", text);
//         throw new Error("Server returned non-JSON response");
//       }

//       const result = await response.json();
//       console.log("📊 Server response:", result);

//       if (result.status === "success") {
//         alert("✅ Registration successful!");
//         form.reset();
//         console.log("🎉 Form reset");
//       } else {
//         alert("❌ Submission failed: " + result.message);
//       }
//     } catch (err) {
//       alert("🚨 Network or processing error: " + err.message);
//       console.error("🔥 Unexpected error occurred:", err);
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".ticket-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("📨 Form submission started");

    const formData = new FormData(form);

    console.log("🧾 Raw form data:");
    for (let [key, value] of formData.entries()) {
      console.log(` - ${key}:`, value);
    }

    // Read and convert photo files to base64
    const userPhotoFile = formData.get("userPhoto");
    const spousePhotoFile = formData.get("spousePhoto");

    const userPhotoBase64 = userPhotoFile && userPhotoFile.size > 0
      ? await fileToBase64(userPhotoFile)
      : "";
    const spousePhotoBase64 = spousePhotoFile && spousePhotoFile.size > 0
      ? await fileToBase64(spousePhotoFile)
      : "";

    console.log("📸 User photo base64:", userPhotoBase64 ? "Present" : "Not provided");
    console.log("📸 Spouse photo base64:", spousePhotoBase64 ? "Presen" : "Not provided");

    const payload = {
      fullName: formData.get("fullName"),
      gender: formData.get("gender"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      ticketType: formData.get("ticketType"),
      spouseName: formData.get("spouseName") || "",
      childrenDetails: formData.get("childrenDetails") || "",
      garbaTraining: formData.get("garbaTraining"),
      earlyBird: formData.get("earlyBird"),
      userPhoto: userPhotoBase64,
      spousePhoto: spousePhotoBase64,
    };

    console.log("📦 Payload to be sent:", payload);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwyUqKiwn6OT6IP7KEQwZVkzAD3ITolm5GiwdcVhjy_cj_0Z0pwNDr4xb74M47iudmtvw/exec", {
        method: "POST",
        //mode: "cors", // Ensure CORS is enabled for production
        //mode: "no-cors", // 🚨 Needed for local testing
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("❌ Invalid response (not JSON):", text);
        throw new Error("Server returned non-JSON response");
      }

      const result = await response.json();
      console.log("📊 Server response:", result);

      if (result.status === "success") {
        alert("✅ Registration successful!");
        form.reset();
        console.log("🎉 Form reset");
      } else {
        alert("❌ Submission failed: " + result.message);
      }
    } catch (err) {
      alert("🚨 Network or processing error: " + err.message);
      console.error("🔥 Unexpected error occurred:", err);
    }
  });

  // Convert file to base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // full data URI with mime type
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
});
