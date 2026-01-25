CREATE TABLE pomodoros(
    id UUID PRIMARY KEY,
    minutes INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    group_id UUID,
    _createdAt TIMESTAMP WITH TIME ZONE
)