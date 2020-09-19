import Appointment from '../infra/typeorm/entities/Appoitment';



export default interface IAppointmentsRepository {


    findByDate(date: Date): Promise<Appointment | undefined>;
}
