var express = require("express");
var router = express.Router();
var models = require("../models");
var checkJwt = require("../middleware/jwt");

// ==================================
// ==== CONTRACTION AND MOM LOG =====
// ==================================



// ===================================
// === ALL USER CONTRACTIONS =========
// ===================================
/**
 * @api {get} /api/mom/contraction Request All User Contractions
 * @apiName GETAllUserContractions
 * @apiGroup Contractions
 *
 * @apiParam {String} Payload id_Token UserId from Auth0.
 *
 * @apiSuccess {Date} duration Duration.
 * @apiSuccess {Date} clocktimerstampstop User TimerStop.
 */
router.get("/contraction", checkJwt, (req, res) => {
  models.contractionTimerTable
    .findAll({
      where: {
        userId: req.user.sub
      }
    })
    .then(log => {
      res.json(log);
    });
});



// ===================================
// == CREATE A NEW CONTRACTION USER ==
// ===================================
/**
 * @api {post} /api/mom/contraction Create A User Contraction
 * @apiName POSTUserContraction
 * @apiGroup Contractions
 *
 * @apiParam {String} Payload id_Token UserId from Auth0.
 * @apiParam {Date} duration Duration
 * @apiParam {Date} clocktimerstampstop User TimerStop
 *
 */
router.post("/contraction", checkJwt, (req, res) => {
  const log = models.contractionTimerTable
    .build({
      userId: req.user.sub,
      duration: req.body.duration,
      clocktimerstampstop: req.body.clocktimerstampstop
    })
    .save()
    .then(log => {
      res.json(log);
    });
});



//====================================
// ======== DESTROY LOG ROUTE ========
//====================================
/**
 * @api {delete} /api/mom/contraction Delete All User Contractions
 * @apiName DELETEAllUserContractions
 * @apiGroup Contractions
 *
 * @apiParam {String} Payload id_Token UserId from Auth0.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "deletion successful"
 *     }
 */
router.delete("/contraction", checkJwt, (req, res) => {
  models.contractionTimerTable
    .destroy({
      where: {
        userId: req.user.sub
      }
    })
    .then(whatIsLeft => {
      res.json({message: "deletion successful"});
    });
});




// ===================================
// == SHOW ALL MOM LOGS BUY USER =====
// ===================================
/**
 * @api {get} /api/mom/momlog Request All User MomLogs
 * @apiName GETAllUserMomLogs
 * @apiGroup Momlog
 *
 * @apiParam {String} Payload id_Token UserId from Auth0.
 *
 * @apiSuccess {Array} text Array of Text logs sorted by the User.
 */
router.get("/momlog", checkJwt, (req, res) => {
  model.momlog
    .findAll({
      where: {
        userId: req.user.sub
      }
    })
    .then(logs => {
      res.json(logs);
    });
});



// ===================================
// ==== SPECIFIC MOM LOG =============
// ===================================
/**
 * @api {get} /api/mom/momlog/:id Request A Specific User MomLog
 * @apiName GETSpecificUserMomLogs
 * @apiGroup Momlog
 *
 * @apiParam {String} Payload id_Token UserId from Auth0.
 * @apiParam {Number} id The id of specific Mom log entry
 *
 * @apiSuccess {Array} text Text of the specific Mom log entry
 */
router.get("/momlog/:id", checkJwt, (req, res) => {
  models.momlog.findById(req.params.id).then(log => {
    res.json(log);
  });
});



// ===================================
// ====== CREATE NEW MOM LOG ENTRY ===
// ===================================
/**
 * @api {post} /api/mom/momlog Create A User MomLog
 * @apiName POSTNewMomLogEntry
 * @apiGroup Momlog
 *
 * @apiParam {String} Payload id_Token UserId from Auth0.
 * @apiParam {String} log Need the text from the body.
 * 
 * @apiSuccess {String} log Text of the specific recently created Log
 */
router.post("/momlog", checkJwt, (req, res) => {
  const momLog = models.momlog
    .build({
      userId: req.user.sub,
      log: req.body.log
    })
    .save()
    .then(momLog => {
      res.json(momLog);
    });
});

module.exports = router;
