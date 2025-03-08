const validateTask = (data, note) => {
    const newObj = {};

    for (const key in data) {
        if (data[key] !== note[key] && key !== "status") {
            newObj[key] = data[key];  // ✅ Correctly update newObj with changed values
        }
    }

    console.log("Updated fields:", newObj);
    return newObj;
};

export default validateTask;
