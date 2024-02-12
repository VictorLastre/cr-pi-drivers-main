import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allTeams } from "../../Redux/Actions/Actions";
import "./Form.css";
import { Link } from "react-router-dom";

const validate = (form) => {
  let errors = {};

  if (!form.name) {
    errors.name = "Please insert a valid name!";
  } else if (!/^[A-Za-z\s]+$/.test(form.name)) {
    errors.name = "Name can only contain letters and spaces!";
  }

  if (!form.lastname) {
    errors.lastname = "Please insert a valid lastname!";
  } else if (!/^[A-Za-z\s]+$/.test(form.name)) {
    errors.name = "Name can only contain letters and spaces!";
  }

  if (!form.nationality) {
    errors.nationality = "Please insert a valid nationality!";
  }

  if (!form.image) {
    errors.image = "Please insert a valid URL image!";
  }

  if (!form.birthdate) {
    errors.birthdate = "Please insert a valid birthdate!";
  }

  if (!form.description) {
    errors.description = "Please insert a valid description!";
  }

  if (!form.teams || form.teams.length === 0) {
    errors.teams = "Please select at least one team!";
  }

  return errors;
};

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    nationality: "",
    image: "",
    birthdate: "",
    description: "",
    teams: [],
  });

  const [errors, setErrors] = useState({
    name: false,
    lastname: false,
    nationality: false,
    image: false,
    birthdate: false,
    description: false,
    teams: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate(form);
    if (Object.keys(formErrors).length === 0) {
      axios
        .post("http://localhost:3001/drivers", form)
        .then(() => {
          alert("Driver created successfully");
          setForm({
            name: "",
            lastname: "",
            nationality: "",
            image: "",
            birthdate: "",
            description: "",
            teams: [],
          });
          setErrors({
            name: false,
            lastname: false,
            nationality: false,
            image: false,
            birthdate: false,
            description: false,
            teams: false,
          });
        })
        .catch(() => {
          alert("Error creating driver");
        });
    } else {
      setErrors(formErrors);
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(allTeams());
  }, [dispatch]);

  const handleDelete = (team) => {
    setForm({
      ...form,
      teams: form.teams.filter((t) => t !== team),
    });
  };

  const handleSelect = (e) => {
    const selected = e.target.value;
    if (form.teams.length >= 5) {
      return alert("Cannot choose more than five teams");
    }
    if (!form.teams.includes(selected)) {
      setForm({
        ...form,
        teams: [...form.teams, selected],
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <Link to="/home">
          <button className="back-home">Home</button>
        </Link>
        <section>
          <h1 className="h1-form">Create a driver</h1>
          <input
            className={`input-container ${errors.name ? "error" : ""}`}
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Name here..."
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </section>
        <section>
          <input
            className={`input-container ${errors.lastname ? "error" : ""}`}
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleInputChange}
            placeholder="Lastname here..."
          />
          {errors.lastname && <p className="error-text">{errors.lastname}</p>}
        </section>
        <section>
          <input
            className={`input-container ${errors.nationality ? "error" : ""}`}
            type="text"
            name="nationality"
            value={form.nationality}
            onChange={handleInputChange}
            placeholder="Nationality here..."
          />
          {errors.nationality && (
            <span className="error-text">{errors.nationality}</span>
          )}
        </section>

        <section>
          <input
            className={`input-container ${errors.image ? "error" : ""}`}
            type="text"
            name="image"
            value={form.image}
            onChange={handleInputChange}
            placeholder="Image here..."
          />
          {errors.image && <p className="error-text">{errors.image}</p>}
        </section>

        <section>
          <input
            className={`input-container ${errors.birthdate ? "error" : ""}`}
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleInputChange}
            placeholder="Birthdate here..."
          />
          {errors.birthdate && <p className="error-text">{errors.birthdate}</p>}
        </section>

        <section>
          <input
            className={`input-container ${errors.description ? "error" : ""}`}
            type="text"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Description here..."
          />
          {errors.description && (
            <p className="error-text">{errors.description}</p>
          )}
        </section>

        <section>
          <h3 className="h3-form">Select teams</h3>
          <div className="teams-container-create">
            <select
              className={`${errors.teams ? "error" : ""}`}
              name="teams"
              onChange={handleSelect}
            >
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
            {errors.teams && <p className="error-text">{errors.teams}</p>}
          </div>
          <div className="selected">
            {form.teams?.map((team) => (
              <span className="team-span" key={team}>
                {team}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(team)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </section>
        <button className="submit" type="submit">
          Create driver
        </button>
      </form>
    </div>
  );
};

export default Form;