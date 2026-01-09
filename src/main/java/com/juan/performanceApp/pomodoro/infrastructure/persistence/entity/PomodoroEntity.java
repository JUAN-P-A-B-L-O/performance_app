package com.juan.performanceApp.pomodoro.infrastructure.persistence.entity;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;
import com.juan.performanceApp.pomodoro.domain.model.PomodoroType;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "pomodoros")
public class PomodoroEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private int minutes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PomodoroType type;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = true)
    private PomodoroGroupEntity group;

    @CreationTimestamp
    private OffsetDateTime _createdAt;

    // JPA only
    protected PomodoroEntity() {}

    public PomodoroEntity(
            UUID id,
            int minutes,
            PomodoroType type,
            PomodoroGroupEntity pomodoroGroupEntity
    ) {
        this.id = id;
        this.minutes = minutes;
        this.type = type;
        this.group = pomodoroGroupEntity;
    }

    // getters and setters

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public PomodoroType getType() {
        return type;
    }

    public void setType(PomodoroType type) {
        this.type = type;
    }

    public PomodoroGroupEntity getGroup() {
        return group;
    }

    public void setGroup(PomodoroGroupEntity group) {
        this.group = group;
    }

    public OffsetDateTime get_createdAt() {
        return _createdAt;
    }

    public void set_createdAt(OffsetDateTime _createdAt) {
        this._createdAt = _createdAt;
    }

    //    public PomodoroGroup getGroup() {
//        return group;
//    }
//
//    public void setGroup(PomodoroGroup group) {
//        this.group = group;
//    }


}
