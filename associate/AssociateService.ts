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
    this.URI = 'https://x9ofuwde2l.execute-api.us-east-1.amazonaws.com/default/qc';
  }

  async getAssociate(
    a: Associate,
    batch: string,
    week: string,
    token: string
  ): Promise<QCFeedback> {
    console.log(`getting associate: token ${token}`);
    return axios
      .get(
        this.URI + '/batches/' + batch + '/weeks/' + week + '/associates/' + a.associateId,
        { headers: {'Authorization': `Bearer ${token}`}}
      )
      .then((result) => result.data)
      .catch((err) => {
        console.log('caught!');
        let qcFeedback = new QCFeedback();
        qcFeedback.associateId = a.associateId;
        qcFeedback.batchId = batch;
        qcFeedback.weekId = Number(week);
        this.putAssociate(qcFeedback, {
            notecontent: qcFeedback.qcNote,
            technicalstatus: qcFeedback.qcTechnicalStatus,
          }, token);
        console.error(err);
      });
  }

  async putAssociate(
    qcfeedback: QCFeedback,
    updateObject: Object,
    token: string
  ): Promise<QCFeedback> {
    console.log(`putting associate: token ${token}`);
    return axios
      .put(
        this.URI + '/batches/' + qcfeedback.batchId + '/weeks/' + qcfeedback.weekId + '/associates/' + qcfeedback.associateId,
        JSON.stringify(updateObject),
        { headers: {'Authorization': `Bearer ${token}`}}
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
        this.URI + '/batches/' + qcfeedback.batchId + '/weeks/' + qcfeedback.weekId + '/associates/' + qcfeedback.associateId,
        updateObject,
        { headers: {'Authorization': `Bearer ${token}`}}
      )
      .then((result) => result.data)
      .catch((err) => {
        console.error(err);
      });
  }
}
export default new AssociateService();

export class QCFeedback {
  batchId: string = '';
  weekId: number = 0;
  associateId: string = '';
  qcNote: string = '';
  qcTechnicalStatus: number = 0;
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
