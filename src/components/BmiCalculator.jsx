// import { useState, useEffect } from 'react';
// import './custom-styles.css';


// function BmiCalculator() {
//   const [username, setUsername] = useState('');
//   const [greeting, setGreeting] = useState('');
//   const [bmiResult, setBmiResult] = useState(null); // State to store BMI result
//   const [error, setError] = useState(null); // State to store errors if any

//   useEffect(() => {
//     // Simulate session check (You can replace it with real authentication logic)
//     const user = sessionStorage.getItem('username');
//     if (!user) {
//       window.location.href = '/login'; // Redirect to login if not logged in
//     } else {
//       setUsername(user);
//     }

//     // Dynamic Greeting based on time
//     const currentHour = new Date().getHours();
//     if (currentHour >= 5 && currentHour < 12) {
//       setGreeting('Good Morning');
//     } else if (currentHour >= 12 && currentHour < 18) {
//       setGreeting('Good Afternoon');
//     } else if (currentHour >= 18 && currentHour < 22) {
//       setGreeting('Good Evening');
//     } else {
//       setGreeting('Good Night');
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const data = {
//       name: formData.get('name'),
//       age: formData.get('age'),
//       gender: formData.get('gender'),
//       height: formData.get('height'),
//       weight: formData.get('weight')
//     };

//     // Handle form submission logic (e.g., calculate BMI or submit to API)
//     console.log('Form Data:', data);

//     try {
//       const response = await fetch('http://localhost/php/bmi.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams(data).toString(),
//       });

//       const result = await response.json(); // Assuming the backend returns a JSON object with BMI
//       if (response.ok) {
//         setBmiResult(result.bmi); // Set the BMI result
//         setError(null); // Clear any previous error
//       } else {
//         throw new Error(result.message || 'Failed to calculate BMI');
//       }
//     } catch (error) {
//       setError(error.message);
//       setBmiResult(null); // Clear any previous result if there's an error
//     }
//   };

//   return (
//     <div className="App bg-gray-100 font-sans">
//       <header className="bg-blue-900 text-white p-4">
//         <h1>BMI Calculator</h1>
//       </header>

//       <div className="wrapper max-w-7xl mx-auto mt-8 p-4">
//         <div className="hero_wrap flex flex-col lg:flex-row items-center">
//           <div className="hero_intro text-center lg:text-left lg:mr-8">
//             <h2 className="text-2xl font-bold">
//               Welcome & {greeting} to BMI Smart Guide!
//             </h2>
//             <h3 className="text-lg mt-2">
//               Currently logged in as: <span className="text-gray-700">{username}</span>
//             </h3>

//             <h1 className="text-4xl font-bold mt-8">Body Mass Index Calculator</h1>
//             <p className="mt-4">
//               Better understand your weight in relation to your height using our BMI calculator.
//             </p>
//           </div>

//           <div className="bmi_calculator bg-white p-8 rounded-lg shadow-lg text-center w-11/12 max-w-lg mt-8 lg:mt-0">
//             <h3 className="text-xl font-bold mb-4">Enter your details below</h3>
//             <form onSubmit={handleSubmit} className="flex flex-col items-center">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter name"
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
//               />
//               <input
//                 type="number"
//                 name="age"
//                 placeholder="Enter age"
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
//               />
//               <select
//                 name="gender"
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
//               >
//                 <option value="">Select gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               <input
//                 type="number"
//                 name="height"
//                 placeholder="Enter height (in m)"
//                 step="0.01"
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
//               />
//               <input
//                 type="number"
//                 name="weight"
//                 placeholder="Enter weight (in kg)"
//                 step="0.1"
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
//               />
//               <button
//                 type="submit"
//                 className="w-11/12 h-10 mt-4 bg-blue-600 text-white font-bold py-0 px-4 rounded-full hover:opacity-90 focus:outline-none focus:shadow-outline"
//               >
//                 Calculate
//               </button>
//             </form>

//             {bmiResult && (
//               <div className="mt-4 text-green-600">
//                 <h3 className="text-xl font-bold">Your BMI: {bmiResult}</h3>
//               </div>
//             )}

//             {error && (
//               <div className="mt-4 text-red-600">
//                 <h3 className="text-xl font-bold">Error: {error}</h3>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BmiCalculator;






import React, { useState } from 'react';

function BmiCalculator() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: ''
  });

  const [bmi, setBmi] = useState(null);
  const [healthMessage, setHealthMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const heightInMeters = formData.height / 100; 
    const bmi = formData.weight / (heightInMeters * heightInMeters);
    const bmiFormatted = bmi.toPrecision(6);

    let healthMessage = '';
    if (bmiFormatted < 185000) {
      healthMessage = "Your BMI indicates that you are underweight. It's important to ensure you're getting enough nutrients.";
    } else if (bmiFormatted >= 185000 && bmiFormatted < 250000) {
      healthMessage = "Your BMI is within the healthy range. Keep up the good work with a balanced diet and regular exercise.";
    } else if (bmiFormatted >= 250000 && bmiFormatted < 300000) {
      healthMessage = "Your BMI indicates that you are overweight. Consider adjusting your diet and increasing physical activity.";
    } else {
      healthMessage = "Your BMI indicates obesity. Consult a healthcare professional for personalized advice and support.";
    }

    setBmi(bmiFormatted);
    setHealthMessage(healthMessage);

    setFormData({
      name: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
    });

    try {
      const response = await fetch('http://localhost/php/bmi.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bmi_calculator">
      <form onSubmit={handleSubmit}>
        <h3>BMI Calculator</h3>

        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />

        <input
          type="number"
          id="age"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
          required
        /><br />

        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          style={{ width: '230px' }}
          required
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select><br />

        <input
          type="number"
          id="height"
          name="height"
          placeholder="Enter your height (m)"
          value={formData.height}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          required
        /><br />

        <input
          type="number"
          id="weight"
          name="weight"
          placeholder="Enter your weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          required
        /><br />

        <button type="submit">Calculate</button>
      </form>

      {/* Display BMI and health message if available */}
      {bmi && (
        <div className="bmi_result">
          <h3>Your BMI: {bmi}</h3>
          <p>{healthMessage}</p>
        </div>
      )}
    </div>
  );
}

export default BmiCalculator;