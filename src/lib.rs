extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;
use std::fmt;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

pub const DIRECTIONS: [i32; 8] = [-11, -10, -9, -1, 1, 9, 10, 11];

#[wasm_bindgen]
#[repr(u8)]
#[derive(Debug, Clone, Eq, PartialEq, Copy)]
pub enum Piece {
  BLACK = 0,
  WHITE = 1,
  EMPTY = 2,
  OUTER = 3
}

//#[wasm_bindgen]
impl Piece {
  pub fn opponent(&self) -> Piece {
    match self {
      Piece::BLACK => Piece::WHITE,
      Piece::WHITE => Piece::BLACK,
      _ => panic!("Unknown player")
    }
  }

  fn name_of(&self) -> char {
    match self {
      Piece::BLACK => '@',
      Piece::WHITE => '0',
      Piece::EMPTY => '.',
      Piece::OUTER => '#'
    }
  }
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct Board {
  game_board: Vec<Piece>,
}

#[wasm_bindgen]
impl Board {
  pub fn new() -> Board {
    let mut b = vec![Piece::OUTER; 100];
    let valid = (11..89)
      .filter(|n| {
        let x = n % 10;
        x >= 1 && x <= 8
      });

    for n in valid {
      match n {
        45 | 54 => b[n] = Piece::BLACK,
        44 | 55 => b[n] = Piece::WHITE,
        _ => b[n] = Piece::EMPTY
      }
    }

    Board {
      game_board: b,
    }
  }

  pub fn get_piece(&self, i: usize) -> Piece {
    self.game_board[i]
  }

  pub fn set_piece(&mut self, i: usize, p: Piece) {
    self.game_board[i] = p;
  }

  pub fn count_piece(&self, p: Piece) -> usize {
    self.game_board.iter()
      .filter(|x| **x == p)
      .count()
  }

  // pub fn get_move(&self, turn: impl MakeMove, player: Piece) -> usize {
  //   let m = turn.play(&self);

  //   if valid_move(m) && self.legal_move(player, m) {
  //     return m
  //   } else {
  //     println!("Illegal move: {}", m);
  //     println!("Try again");
  //     self.get_move(turn, player)
  //   }
  // }

  // apply player's move to board
  // first make move then make any valid flips
  pub fn make_move(&mut self, m: usize, player: Piece) {
    self.set_piece(m, player);

    for dir in DIRECTIONS.iter() {
      self.make_flips(m, player, *dir);
    }
  }

  // try to flip opponent piece in any direction
  fn make_flips(&mut self, m: usize, player: Piece, dir: i32) {
    if let Some(bracket) = self.would_flip(m, player, dir) {
      let mut c = m as i32 + dir;

      while c != bracket as i32 {
        self.set_piece(c as usize, player);
        c += dir;
      }
    }
  }

  pub fn cells(&self) -> *const Piece {
    self.game_board.as_ptr()
  }

  pub fn render(&self) -> String {
    self.to_string()
  }

  // check if move is legal
  // legal moves must be into an empty square and it must flip
  // at least one opponent piece
  pub fn legal_move(&self, player: Piece, m: usize) -> bool {
    self.get_piece(m) != player && DIRECTIONS.iter() 
      .any(|dir| self.would_flip(m, player, *dir) != None)
  }

  // check if player has any legal moves
  pub fn any_move(&self, player: Piece) -> bool {
    (11..89)
      .filter(|n| {
        let x = n % 10;
        x >= 1 && x <= 8
      })
      .any(|m| self.legal_move(player, m))
  } 

  pub fn valid_move(m: usize) -> bool {
    let x= m % 10;
    (m >= 11 && m <= 88) && (x >= 1 && x <= 8)
  }
}

impl Board {
   // find player to play next or None if nobody can move
  pub fn next_turn(&self, previous: Piece) -> Option<Piece> {
    let opponent = previous.opponent();

    if self.any_move(opponent) {
      return Some(opponent);
    } else if self.any_move(previous) {
      return Some(previous);
    } 

    None
  }

  // would this move result in any flips in this direction
  fn would_flip(&self, m: usize, player: Piece, dir: i32) -> Option<usize> {
    let x = (m as i32 + dir) as usize;

    if self.get_piece(x) != player.opponent() {
      return None;
    }

    self.find_bracketing((x as i32 + dir) as usize, player, dir)
  }

  // return the square number of the bracketing piece
  fn find_bracketing(&self,square: usize, player: Piece, dir: i32) -> Option<usize> {
    let p = self.get_piece(square);

    if p == player {
      Some(square)
    } else if p == player.opponent() {
      self.find_bracketing((square as i32 + dir) as usize, player, dir)
    } else {
      None
    }    
  }
}

impl fmt::Display for Board {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    for row in 1..9 {
      for col in 1..9 {
        let p = &self.game_board[col + row * 10];
        write!(f, "{} ", p.name_of())?;
      }
      writeln!(f, "")?;
    }
    Ok(())
  }
}
