import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    create(data: { name: string; email: string }) {
        const user = new this.userModel(data);
        return user.save();

    }

    findAll() {
        return this.userModel.find().exec();
    }

    findOne(id: string) {
        return this.userModel.findById(id).exec();

    }

    update(id: string, data: {name?: string; email?:  string; password?: string}) {
        return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    delete(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
