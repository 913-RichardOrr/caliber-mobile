import axios from 'axios';

/**
 * sends axios calls to the associate lambda via api gateway,
 * to get qc feedback for individual associates
 * also sends axios calls to the mock data api, to get associate's name
 */
class AssociateService {
  private URI: string;
  constructor() {
    // URI for the API Gateway
    this.URI =
      'https://d3e1hb8u20.execute-api.us-east-1.amazonaws.com/default/qc';
  }

  async getAssociate(
    a: Associate,
    batch: string,
    week: string,
    token: string
  ): Promise<QCFeedback> {
    return axios
      .get(
        `${this.URI}/batches/${batch}/weeks/${week}/associates/${a.associateId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => result.data)
      .catch((err) => {
        let qcFeedback = new QCFeedback();
        qcFeedback.associateid = a.associateId;
        qcFeedback.batchid = batch;
        qcFeedback.weeknumber = Number(week);
        this.putAssociate(
          qcFeedback,
          {
            notecontent: qcFeedback.notecontent,
            technicalstatus: qcFeedback.technicalstatus,
          },
          token
        );
        console.error(err);
      });
  }

  async putAssociate(
    qcfeedback: QCFeedback,
    updateObject: Object,
    token: string
  ): Promise<QCFeedback> {
    return axios
      .put(
        `${this.URI}/batches/${qcfeedback.batchid}/weeks/${qcfeedback.weeknumber}/associates/${qcfeedback.associateid}`,
        JSON.stringify(updateObject),
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => result.data)
      .catch((err) => {
        console.error(err);
      });
  }

  async updateAssociate(
    qcfeedback: QCFeedback,
    updateObject: Object,
    token: string
  ): Promise<QCFeedback> {
    return axios
      .patch(
        `${this.URI}/batches/${qcfeedback.batchid}/weeks/${qcfeedback.weeknumber}/associates/${qcfeedback.associateid}`,
        updateObject,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => result.data)
      .catch((err) => {
        console.error(err);
      });
  }
}
export default new AssociateService();

export class QCFeedback {
  batchid: string = '';
  weeknumber: number = 0;
  associateid: string = '';
  notecontent: string = '';
  technicalstatus: number = 0;
}

export class Associate {
  associateId: string = 'Test';
  firstName: string = 'TestFirstName';
  lastName: string = 'TestLastName';
}

export class AssociateWithFeedback {
  associate: Associate = new Associate();
  qcFeedback: QCFeedback = new QCFeedback();
}
