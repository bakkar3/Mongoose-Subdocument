import NestedUsersModel from "../models/nestedUsersModel.js";

export const getAllNestedUsers = async () => {
  return await NestedUsersModel.find({});
};

export const getAllNestedUsersEmails = async () => {
  return await NestedUsersModel.find({}, { email: 1 });
};

export const getAccountHistoryOfNestedUser = async (id) => {
  return await NestedUsersModel.findById(id, {
    accountHistory: 1,
  });
};

export const createNestedUser = async (nestedUser, callback) => {
  await NestedUsersModel.create(nestedUser, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(docs);
    }
  });
};

export const deleteNestedUser = async (id) => {
  return await NestedUsersModel.findByIdAndRemove(id);
};

export const updateNestedUser = async (id, updateFields) => {
  return await NestedUsersModel.findByIdAndUpdate(id, updateFields, {
    new: true,
  });
};
