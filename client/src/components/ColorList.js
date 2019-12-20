import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(initialColor);


  console.log(colorToEdit)
  const editColor = color => {
    setAdding(false);
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => updateColors(
        colors.map(color => {
          if (color.id !== res.data.id) {
            return color
          }
          return res.data
        })

        // Ternary instead
        // colors.map(color => (color.id === res.data.id ? res.data : color))

      ))
      // .then(res => {
      //   let newArr = colors.filter(color => color.id !== res.data.id)
      //   newArr = [...newArr, res.data]
      //   updateColors(newArr)
      // })
      .catch(err => console.log(err))

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => updateColors(
        colors.filter(i => i.id !== color.id)
      ))
  };

  const addColor = e => {
    setAdding(true);
    setEditing(false);
  }

  const saveAdd = e => {
    e.preventDefault()
    axiosWithAuth()
      .post(`/colors`, colorToAdd)
      .then(res => updateColors(res.data))
      .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      {!adding && (
        <div className="button-row">
          <button onClick={addColor}> Add Color </button>
        </div>
      )}

      {/* ----- Start edit color */}
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* ----- End edit color */}

      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}

      {adding && (

        <form onSubmit={saveAdd}>
          <legend>add color</legend>
          <label>color name:
            <input
              type="text"
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>

          <label>hex code:
            <input
              type="text"
              name="hex"
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Submit new color</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>


      )}



    </div>
  );
};

export default ColorList;
