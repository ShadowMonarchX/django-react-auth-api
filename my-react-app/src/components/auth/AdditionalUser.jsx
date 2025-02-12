import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/UserAuthApi";
import { storeToken } from "../../services/LocalStorageService";
import "../../styles/NetflixClone.css";

function AdditionalUser() {
  const navigate = useNavigate();

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
  const [registerUser] = useRegisterUserMutation();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/auth/countries");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    const fetchStates = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/auth/states?country=${selectedCountry}`
        );
        const data = await res.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) return;

    const fetchCities = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/auth/cities?state=${selectedState}`
        );
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [selectedState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actualData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      city: selectedCity,
    };
  };

  return (
    <div className="home">
      <div className="hero-section text-center text-white d-flex justify-content-center align-items-center">
        <div className="auth-container">
          <h1 className="auth-form-title">User Info</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              required
              className="selection-block"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              required
              disabled={!selectedCountry}
              className="selection-block"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              required
              disabled={!selectedState}
              className="selection-block"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>

            <button type="submit" className="btn-signin">
              Continue
            </button>
          </form>

          {serverError?.general && (
            <div className="error-message">{serverError.general}</div>
          )}

          <br />
        </div>
      </div>
    </div>
  );
}

export default AdditionalUser;
