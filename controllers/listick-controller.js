import ListickModel from '../models/listick-model.js';


class ListickController {
    async getAllListicks(req, res, next) {
        try {
            const user = req.user.id;
            const Userlist = await ListickModel.findOne({user});
            if (Userlist)
                return res.json(Userlist.list);
            return res.json([]);
        } catch (e) {
            next(e);
        }
    }
    async saveAllListicks(req, res, next) {
        try {
            const user = req.user.id;
            const list = req.body.list;
            const Userlist = await ListickModel.findOne({user});
            if (Userlist) {
                Userlist.list = list;
                await Userlist.save();
            }else{
                Userlist = await ListickModel.create({user, list});
            }
            return res.json(list);
        } catch (e) {
            next(e);
        }
    }
    async saveListick(req, res, next) {
        try {
            const user = req.user.id;
            const {id, top, left, text} = req.body;
            const newlistick = {id, top, left, text};


            let Userlist = await ListickModel.findOne({user});
            if (Userlist) {
                const list = Userlist.list;
                let exist = false;
                for (let l of list) {
                    if (l.id===newlistick.id){
                        l.top = newlistick.top;
                        l.left = newlistick.left;
                        l.text = newlistick.text;
                        exist = true;
                        break;
                    }
                  }
                if (!exist) 
                    list.push(newlistick);
                Userlist.list = list;
                await Userlist.save();
            }else{
                Userlist = await ListickModel.create({user, list: newlistick});
            }
            return res.json(newlistick);
        } catch (e) {
            next(e); 
        }
    }
    async deleteListick(req, res, next) {
        try {
            const user = req.user.id;
            const id = Number(req.query.id);
            let Userlist = await ListickModel.findOne({user});
            if (Userlist) {
                const newList = Userlist.list.filter((l)=>l.id!==id);
                Userlist.list = newList;
                await Userlist.save();
            }

            //const ok = await ListickModel.deleteOne({user, id});

            return res.json(id);
        } catch (e) {
            next(e); 
        }
    }
}

export default new ListickController();