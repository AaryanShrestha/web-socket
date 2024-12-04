const Data = require("../Model/Data");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getData = catchAsyncErrors(async (req, res, next) => {
  const data = await Data.find();

  // Broadcast all data to WebSocket clients
  req.app.locals.broadcast({
    type: "all_data",
    data: data,
  });

  res.status(200).json({ success: true, data });
});

exports.postData = catchAsyncErrors(async (req, res, next) => {
  // Create new data
  await Data.create(req.body);

  // Fetch all data from the model
  const allData = await Data.find();

  // Broadcast all data to WebSocket clients
  req.app.locals.broadcast({
    type: "all_data",
    data: allData,
  });

  res.status(201).json({ success: true, message: "Data added successfully!" });
});

exports.updateData = catchAsyncErrors(async (req, res, next) => {
  // Update data in the model
  await Data.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Fetch all data from the model
  const allData = await Data.find();

  // Broadcast all data to WebSocket clients
  req.app.locals.broadcast({
    type: "all_data",
    data: allData,
  });

  res
    .status(200)
    .json({ success: true, message: "Data updated successfully!" });
});

exports.deleteData = catchAsyncErrors(async (req, res, next) => {
  // Delete data from the model
  await Data.findByIdAndDelete(req.body.id);

  // Fetch all data from the model
  const allData = await Data.find();

  // Broadcast all data to WebSocket clients
  req.app.locals.broadcast({
    type: "all_data",
    data: allData,
  });

  res
    .status(200)
    .json({ success: true, message: "Data deleted successfully!" });
});
