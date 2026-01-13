ALTER TABLE pomodoros
ADD CONSTRAINT fk_pomodoros_pomodoro_groups
FOREIGN KEY(group_id) REFERENCES pomodoro_groups(id);