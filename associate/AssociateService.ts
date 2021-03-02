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
    this.URI = 'https://7tu8pm3exl.execute-api.us-east-1.amazonaws.com/default';
  }

  async getAssociate(
    a: Associate,
    batch: string,
    week: string
  ): Promise<QCFeedback> {
    return axios
      .get(
        `${this.URI}/qc/batches/${batch}/weeks/${week}/associates/${a.associateId}`
      )
      .then((result) => result.data)
      .catch((err) => {
        console.error(err);
      });
  }
  async replaceAssociate(
    qcfeedback: QCFeedback,
    updateObject: Object
  ): Promise<QCFeedback> {
    return axios
      .put(
        `${this.URI}/qc/batches/${qcfeedback.batchId}/weeks/${qcfeedback.weekId}/associates/${qcfeedback.associateId}`,
        updateObject
      )
      .then((result) => result.data)
      .catch((err) => {
        console.error(err);
      });
  }
  async updateAssociate(
    qcfeedback: QCFeedback,
    updateObject: Object
  ): Promise<QCFeedback> {
    return axios
      .patch(
        `${this.URI}/qc/batches/${qcfeedback.batchId}/weeks/${qcfeedback.weekId}/associates/${qcfeedback.associateId}`,
        updateObject
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
