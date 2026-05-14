// backend/utils/generateComplaintId.js

const generateComplaintId = async (ComplaintModel) => {
  const count = await ComplaintModel.countDocuments();
  const year = new Date().getFullYear();

  return `CMP-${year}-${String(count + 1).padStart(4, "0")}`;
};

export default generateComplaintId;