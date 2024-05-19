import ListickModel from '../models/listick-model.js';


class ListickController {
    async getAllListicks(req, res, next) {
        try {
            const user = req.user.id;
            const list = await ListickModel.find({user});
            const l = {a:2};
            return res.json(list);
        } catch (e) {
            next(e); 
        }
    }
    async saveListick(req, res, next) {
        try {
            const user = req.user.id;
            const {id, top, left, text} = req.body;
            let Listick = await ListickModel.findOne({user, id});
            if (Listick) {
                Listick.top = top;
                Listick.left = left;
                Listick.text = text;
                Listick.save();
            }else{
                Listick = await ListickModel.create({user, id, top, left, text});
            }
            return res.json(Listick);
        } catch (e) {
            next(e); 
        }
    }
    async deleteListick(req, res, next) {
        try {
            const user = req.user.id;
            const id = req.query.id;
            const ok = await ListickModel.deleteOne({user, id});

            return res.json(ok);
        } catch (e) {
            next(e); 
        }
    }
}

export default new ListickController();