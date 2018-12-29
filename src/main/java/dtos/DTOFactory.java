package dtos;

public class DTOFactory {

    public GeneralDTO createGeneralDTOFromMessage(sender.MessageData message){
        if(message.getIn() > 0){
            return new Incoming(message);
        } else {
            return new Outgoing(message);
        }
    }
}
