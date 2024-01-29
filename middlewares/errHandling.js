export const errHandling = (err, req, res, next) => {

res.status(res.statusCode || 500);
res.send(res.massage || "התרחשה תקלה")
}