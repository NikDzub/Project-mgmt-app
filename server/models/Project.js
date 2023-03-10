import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  name: { type: String },
  description: { type: String },
  status: { type: String, enum: ['Not started', 'In progress', 'Completed'] },
});

export default mongoose.model('Project', ProjectSchema);
