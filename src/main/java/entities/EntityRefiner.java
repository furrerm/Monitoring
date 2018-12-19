package entities;

import sender.MessageData;

import java.util.Set;

public interface EntityRefiner {

    Set<sender.MessageData> entitiesToMessageData(Set<DataEntity> dataEntities);
}
