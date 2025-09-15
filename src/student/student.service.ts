import { Injectable } from '@nestjs/common';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentService {

    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }

    // Create a new student
    async createStudent(data: Partial<Student>): Promise<Student> {
        const newStudent = new this.studentModel(data);
        return newStudent.save();
    }

    // Fetch all students
    async getAllStudents(): Promise<Student[]> {
        return this.studentModel.find().exec();
    }

    // Fetch a student by ID
    async getStudentById(id: string): Promise<Student | null> {
        return this.studentModel.findById(id).exec();
    }

    // Update a student by ID
    async updateStudentCompletely(id: string, data: Partial<Student>): Promise<Student | null> {
        // return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec();
        return this.studentModel.findByIdAndUpdate(id, {
            name: data.name ?? null,
            age: data.age ?? null,
            email: data.email ?? null,
        }, { overwrite: true, new: true }).exec();
    }
    // Update a student by ID
    async UpdateStudentPartially(id: string, data: Partial<Student>): Promise<Student | null> {
        return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Delete a student by ID
    async deleteStudent(id: string): Promise<Student | null> {
        return this.studentModel.findByIdAndDelete(id).exec();
    }
}
