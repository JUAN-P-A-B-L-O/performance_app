package com.juan.performanceApp.pomodoro.domain.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class PomodoroTest {


    @Test
    @DisplayName("testing the test haha")
    void firstTest() {

            Pomodoro pomodoro = Pomodoro.start(UUID.randomUUID(),PomodoroType.POMODORO, 25);

            assertFalse(pomodoro.isFinished());
            assertNull(pomodoro.get_finishedAt());

            //when

            pomodoro.finish();

            //then
            assertTrue(pomodoro.isFinished());
            assertNotNull(pomodoro.get_finishedAt());

    }

}
