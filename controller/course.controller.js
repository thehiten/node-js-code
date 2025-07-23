import Course from "../models/course.model.js";

export const courseCreate = async (req, res) => {
    const { title, description, price, image } = req.body;

    try {
        const course = await Course.findOne({ title });
        if (course) {
            return res.status(400).json({
                message: "course already exists"
            })
        }
        const newCourse = new Course(
            {
                title,
                description,
                price,
                image
            }
        )
        await newCourse.save();
        if (newCourse) {
            return res.status(200).json({
                message: "newCourse added successfully"
            })
        }


    }
    catch (error) {
        return res.status(500).json(
            { message: "internal Server error" }
        )

    }




}

export const courseUpdate = async (req, res) => {
    const { title, description, price, image } = req.body;

    try {
        const { id } = req.params;

        const course = await Course.findByIdAndUpdate(

            id

            ,
            {

                title,
                description,
                price,
                image
            },
            {
                new: true

            }

        )

        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }

        return res.status(200).json({
            message: "course updated successfully"
        })

    }
    catch (error) {

        return res.status(500).json({
            message: "internal server error"
        })

    }

}

export const courseDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndDelete(
            id
        );
        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }

        return res.status(201).json({
            message: "Course deleted Successfully"
        })



    }
    catch (error) {
        return res.status(500).json(
            { message: "Internal server Error" }
        )

    }
}

export const courseGet = async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses) {
            return res.status(400).json({
                message: "courses not found"
            })
        }

        return res.status(200).json(
            {
                message: "courses found successfully",
                courses
            }
        )

    }
    catch (error) {
        return res.status(500).json({
            message: "internal server error"
        })

    }

}

