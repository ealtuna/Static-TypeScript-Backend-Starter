import { Request, Response } from "express";
import { check, validationResult } from "express-validator";

/**
 * Contact form page.
 * @route GET /contact
 */
export const getContact = (req: Request, res: Response) => {
    res.send({title: "Contact"})
};

/**
 * @route POST /contact
 */
export const postContact = async (req: Request, res: Response) => {
    await check("name", "Name cannot be blank").not().isEmpty().run(req);
    await check("email", "Email is not valid").isEmail().run(req);
    await check("message", "Message cannot be blank").not().isEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.redirect("/contact");
    }
};
