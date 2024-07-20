const CronController = async (req, res) =>{
    try {
        const jobs = await Cronjobs.findAll({
            where: {
              status: {
                [Op.eq]: 'Pending',
              },
            },
          });
        jobs.forEach(e => {
            if(e.typeId==1){
                try{

                }catch(e){
                    const update_job = Cronjobs.update({where:{id:e.id}});
                }
            }else if(e.typeId==2){
                
            }
        });
        res.send(jobs);
    } catch (err) {
        res.send(err);
    }
}