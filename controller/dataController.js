const Data = require("../Model/Data");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getData = catchAsyncErrors(async (req, res, next) => {
  const data = await Data.find();
  res.status(200).json({ success: true, data });
});

exports.postData = catchAsyncErrors(async (req, res, next) => {
  const newData = await Data.create(req.body);

  // Broadcast new data to WebSocket clients
  req.app.locals.broadcast({
    type: "new_data",
    payload: newData,
  });

  res.status(201).json({ success: true, data: newData });
});

exports.updateData = catchAsyncErrors(async (req, res, next) => {
  const updatedData = await Data.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Broadcast updated data to WebSocket clients
  req.app.locals.broadcast({
    type: "update_data",
    payload: updatedData,
  });

  res.status(200).json({ success: true, data: updatedData });
});

exports.deleteData = catchAsyncErrors(async (req, res, next) => {
  const deletedData = await Data.findByIdAndDelete(req.body.id);

  // Broadcast deletion event to WebSocket clients
  req.app.locals.broadcast({
    type: "delete_data",
    payload: { id: req.body.id },
  });

  res.status(200).json({ success: true, message: "Data deleted successfully" });
});
