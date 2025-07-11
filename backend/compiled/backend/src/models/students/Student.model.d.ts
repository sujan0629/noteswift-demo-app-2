import mongoose from "mongoose";
import { TStudent } from "@shared/model/students/Student";
export declare const Student: mongoose.Model<TStudent<mongoose.Types.ObjectId>, {}, {}, {}, mongoose.Document<unknown, {}, TStudent<mongoose.Types.ObjectId>, {}> & TStudent<mongoose.Types.ObjectId> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, mongoose.Schema<TStudent<mongoose.Types.ObjectId>, mongoose.Model<TStudent<mongoose.Types.ObjectId>, any, any, any, mongoose.Document<unknown, any, TStudent<mongoose.Types.ObjectId>, any> & TStudent<mongoose.Types.ObjectId> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, TStudent<mongoose.Types.ObjectId>, mongoose.Document<unknown, {}, mongoose.FlatRecord<TStudent<mongoose.Types.ObjectId>>, {}> & mongoose.FlatRecord<TStudent<mongoose.Types.ObjectId>> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>>;
