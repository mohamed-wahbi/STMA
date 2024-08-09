// import React, { useState } from 'react';
// import axios from "axios";

// const TestUploadMany = () => {
//     const [selectedFiles, setSelectedFiles] = useState(null);

//     const handleFileChange = (e) => {
//         setSelectedFiles(e.target.files);
//       };
     
//       const handleSubmit = async () => {
//         const formData = new FormData();
//         for (let i = 0; i < selectedFiles.length; i++) {
//           formData.append('images', selectedFiles[i]);
//         }
//         console.log(selectedFiles);

//         try {
//           await axios.post('http://127.0.0.1:5050/api/user/service/uploadimgs', formData);
//           console.log('Images uploaded successfully');
//         } catch (error) {
//           console.error('Error uploading images:', error);
//         }
//       };


//   return (
//     <div>
        
//         <form onSubmit={handleSubmit}>
//             <input type='file'  multiple onChange={handleFileChange} />
//             <button type='submit'>send</button>
//         </form>


//     </div>
//   )
// }

// export default TestUploadMany

// --------------------------Envoyer un email de l'utilisateur au admin---------- 
    // import React, { useState, useEffect } from 'react';
    // import emailjs from 'emailjs-com';

    // const TestUploadMany = () => {
    //   const [name, setName] = useState("");
    //   const [message, setMessage] = useState("");
    //   const [email, setEmail] = useState('');

    //   useEffect(() => {
    //     emailjs.init('lDXVNFAWxDMn52JMH');
    //   }, []);

    //   const handeleSubmit = (e) => {
    //     e.preventDefault();
    //     alert("Merci pour votre message, il sera traité au plus vite");

    //     const templateId = "template_pho0hzh";
    //     const serviceId = "service_3l48gv9";

    //     sendFeedback(serviceId, templateId, {
    //       name: name,
    //       message: message,
    //       email: email,
    //     });

    //     e.target.reset();
    //   };

    //   const sendFeedback = (serviceId, templateId, variables) => {
    //     emailjs
    //       .send(serviceId, templateId, variables)
    //       .then((res) => {
    //         console.log("success");
    //       })
    //       .catch((err) => {
    //         console.error("Il y a une erreur :", err);
    //       });
    //   };

    //   return (
    //     <div>
    //       <form onSubmit={handeleSubmit}>
    //         <div>
    //           <label>Name : </label>
    //           <input type='text' value={name} required onChange={(e) => setName(e.target.value)} />
    //         </div>

    //         <div>
    //           <label>Message : </label>
    //           <input type='text' value={message} required onChange={(e) => setMessage(e.target.value)} />
    //         </div>

    //         <div>
    //           <label> Email : </label>
    //           <input type='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
    //         </div>
    //         <button type='submit'>Envoyer</button>
    //       </form>
    //     </div>
    //   );
    // };

    // export default TestUploadMany;
// ---------------------------------------------------------------



// import React, { useState, useEffect } from 'react';
// import emailjs from 'emailjs-com';

// const AdminEmailSender = () => {
//   const [recipient, setRecipient] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     emailjs.init('lDXVNFAWxDMn52JMH');
//   }, []);

//   const sendEmail = (e) => {
//     e.preventDefault();
//     alert("Email envoyé avec succès");

//     const templateParams = {
//       to_email: recipient,
//       subject: subject,
//       message_html: message,
//     };

//     emailjs.send('service_3l48gv9', 'template_pho0hzh', templateParams)
//       .then((response) => {
//         console.log('E-mail envoyé :', response);
//       })
//       .catch((error) => {
//         console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
//       });

//     // Réinitialiser le formulaire après l'envoi
//     e.target.reset();
//   };

//   return (
//     <div>
//       <h2>Envoyer un e-mail en tant qu'administrateur</h2>
//       <form onSubmit={sendEmail}>
//         <div>
//           <label>Destinataire :</label>
//           <input type="email" required onChange={(e) => setRecipient(e.target.value)} />
//         </div>
//         <div>
//           <label>Sujet :</label>
//           <input type="text" required onChange={(e) => setSubject(e.target.value)} />
//         </div>
//         <div>
//           <label>Message :</label>
//           <textarea rows="4" required onChange={(e) => setMessage(e.target.value)} />
//         </div>
//         <button type="submit">Envoyer</button>
//       </form>
//     </div>
//   );
// };

// export default AdminEmailSender;












