from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask import Flask,request,jsonify

app = Flask(__name__)
api = Api(app)

POLICE = {
  '1': {'name': 'Police A', 'zone': 23, 'rank': 'A'},
  '2': {'name': 'Police B', 'zone': 20, 'rank': 'B'},
  '3': {'name': 'Police C', 'zone': 21, 'rank': 'C'},
  '4': {'name': 'Police D', 'zone': 22, 'rank': 'D'},
}
ALERTS = {
  '1': {'sent_by': 'Police A', 'sent_to': 'Police X', 'time': 'A'},
  '2': {'sent_by': 'Police B', 'sent_to': 'Police X', 'time': 'B'},
  '3': {'sent_by': 'Police C', 'sent_to': 'Police X', 'time': 'C'},
  '4': {'sent_by': 'Police D', 'sent_to': 'Police X', 'time': 'D'},
}
parser = reqparse.RequestParser()

class LandingPage(Resource):
	def get(self):
		return jsonify({'message' : 'Welcome to Police APIs',
                 'documentation' : '<documentation link to be put here>'})

class PoliceList(Resource):

    def get(self):
        return POLICE
    
    def post(self):
        parser.add_argument("name")
        parser.add_argument("zone")
        parser.add_argument("rank")
        args = parser.parse_args()
        police_id = int(max(POLICE.keys())) + 1
        police_id = '%i' % police_id
        POLICE[police_id] = {
            "name": args["name"],
            "zone": args["zone"],
            "rank": args["rank"],
        }
        return POLICE[police_id], 201

class Alerts(Resource):

    def get(self):
        return ALERTS
    
    def post(self):
        parser.add_argument("sent_by")
        parser.add_argument("sent_to")
        parser.add_argument("time")
        args = parser.parse_args()
        alert_id = int(max(ALERT.keys())) + 1
        alert_id = '%i' % alert_id
        ALERT[alert_id] = {
            "sent_by": args["sent_by"],
            "sent_to": args["sent_to"],
            "time": args["time"],
        }
        return ALERT[alert_id], 201
       

class Police(Resource):
    def get(self, police_id):
          if police_id not in POLICE:
            return "Not found", 404
          else:
            return POLICE[police_id]
            
    def put(self, police_id):
        parser.add_argument("name")
        parser.add_argument("zone")
        parser.add_argument("rank")
        args = parser.parse_args()
        if police_id not in POLICE:
            return "Record not found", 404
        else:
            student = POLICE[police_id]
            student["name"] = args["name"] if args["name"] is not None else student["name"]
            student["zone"] = args["zone"] if args["zone"] is not None else student["zone"]
            student["rank"] = args["rank"] if args["rank"] is not None else student["rank"]
            return student, 200

    def delete(self, police_id):

        if police_id not in POLICE:
            return "Not found", 404
        else:
            del POLICE[police_id]
        return '', 204

api.add_resource(LandingPage, '/')
api.add_resource(PoliceList, '/police/')
api.add_resource(Police, '/police/<police_id>')
api.add_resource(Alerts, '/alerts/')


if __name__ == "__main__":
  app.run(port = 3400,debug=True)
