import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    // Store the ID of the user who created the article
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    body: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export const Article = mongoose.model('Article', articleSchema);