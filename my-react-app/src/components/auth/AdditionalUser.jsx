import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAdditionalUserMutation } from "../../services/UserAuthApi";
import { getToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../app/features/AuthSlice";
import "../../styles/componentscss/AdditionalUser.css";

function AdditionalUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [serverError, setServerError] = useState(null);
  const [additionalUser] = useAdditionalUserMutation();

  useEffect(() => {
    const tokenData = getToken();
    if (tokenData?.access_token && tokenData.access_token !== "undefined") {
      dispatch(setUserToken({ access_token: tokenData.access_token }));
    } else {
      console.error("Token failed.");
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const response = await fetch(
        "http://localhost:8001/api/v1/auth/countries/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch countries");
      setCountries(await response.json());
    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountries([]);
    }
  };

  useEffect(() => {
    if (selectedCountry) fetchStates();
  }, [selectedCountry]);

  const fetchStates = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const response = await fetch(
        `http://localhost:8001/api/v1/auth/states/?country=${selectedCountry}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch states");
      setStates(await response.json());
    } catch (error) {
      console.error("Error fetching states:", error);
      setStates([]);
    }
  };

  useEffect(() => {
    if (selectedState) fetchCities();
  }, [selectedState]);

  const fetchCities = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const response = await fetch(
        `http://localhost:8001/api/v1/auth/cities/?state=${selectedState}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch cities");
      setCities(await response.json());
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const access_token = localStorage.getItem("access_token");
    // console.log("Access token retrieved:", access_token);
  
    if (!access_token) {
      console.error("No access token found.");
      return; 
    }
  
    const actualData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      country_id: selectedCountry,
      state_id: selectedState,
      city_id: selectedCity,
    };
  
    try {
      console.log("Body Data:", actualData);
  
      const response = await additionalUser({
        access_token, 
        actualData,  
      }).unwrap();
  
      console.log("Success:", response);
      navigate("/"); 
    } catch (error) {
      console.error("Error submitting data:", error);
      setServerError(error.data || { general: "An error occurred." });
    }
  };
  
  return (
    <div className="home">
      <div className="hero-section">
        <div className="auth-container">
          <h1 className="auth-form-title">User Info</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Country Selection */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              required
              className="selection-country"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>

            {/* State Selection */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              required
              disabled={!selectedCountry}
              className="selection-state"
            >
              <option value="">Select State</option>
              {states.length > 0 ? (
                states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))
              ) : (
                <option disabled>No states available</option>
              )}
            </select>

            {/* City Selection */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              required
              disabled={!selectedState}
              className="selection-city"
            >
              <option value="">Select City</option>
              {cities.length > 0 ? (
                cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))
              ) : (
                <option disabled>No cities available</option>
              )}
            </select>

            {/* Input Fields */}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="input-first-name"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="input-last-name"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="input-phone-number"
            />

            <button type="submit" className="btn-signin">
              Continue
            </button>
          </form>

          {serverError?.general && (
            <div className="error-message">{serverError.general}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdditionalUser;
